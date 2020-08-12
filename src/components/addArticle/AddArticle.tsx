import React, { useEffect, useState } from 'react'
import Select from "react-select";
import { selectStyle } from "../../utils/SelectStyle";
import css from './addArticle.module.css'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// @ts-ignore
import draftToHtml from 'draftjs-to-html';
import { useDispatch, useSelector } from "react-redux";
import { GlobalStateType } from "../../state/root-reducer";
import { getCategories } from "../../state/selectors";
import api from "../../api/Api";
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { checkToken } from "../../state/authReducer";
import { useHistory } from 'react-router-dom';
import { MainButton } from "../Styles";
import { useTranslation } from "react-i18next";


type Props = {
    name: string
    last_name: string
}
const AddArticle: React.FC<Props> = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const history = useHistory()
    console.log(history)
    const [editor, setEditor] = useState<any>(EditorState.createEmpty())
    const categories = useSelector((state: GlobalStateType) => getCategories(state))
    const categoriesList = categories.map((item: any) => {
        return {
            value: item.id,
            label: item.title
        }
    })

    const [category, setCategory] = useState<any>(null)
    const [subCategoriesList, setSubCategoriesList] = useState<any>([])
    const [subCategories, setSubCategories] = useState<any>(null)
    const [subCategory, setSubCategory] = useState<any>(null)
    const [typesList, setTypesList] = useState([])
    const [types, setTypes] = useState<any>(null)
    const [type, setType] = useState<any>(null)
    // const [subType, setSubType] = useState(null)

    useEffect(() => {
        api.getSubCategory()
            .then((res: AxiosResponse) => {
                let newArr = res.data.results.map((item: any) => ({
                    value: item.id,
                    label: item.title,
                    category: item.category
                }))
                setSubCategoriesList(newArr)
            })
    }, [])
    useEffect(() => {
        const arr = subCategoriesList.filter((item: any) => category.value === +item.category ? item : null)
        console.log(arr)
        setSubCategories(arr)
    }, [category])
    useEffect(() => {
        if (subCategory !== null) {
            api.getTypes()
                .then((res) => {
                    let newArr = res.data.results.map((item: any) => ({
                        value: item.id,
                        label: item.title,
                        category: item.subcategory
                    }))
                    setTypesList(newArr)
                    const arr = newArr.filter((item: any) => +subCategory.value === +item.category ? item : null)
                    setTypes(arr)
                })
        }
    }, [subCategory])

    const createArticle = async (data: any) => {
        return dispatch(checkToken(() => api.createArticle(data)))
    }
    const formik = useFormik({
        initialValues: {
            user: {
                first_name: props.name,
                last_name: props.last_name,
            },
            title: '',
            additions: [],
        },
        onSubmit: (values: any) => {
            createArticle({
                ...values,
                category: category.value,
                types: type ? type.value : null,
                subcategory: subCategory ? subCategory.value : null,
                text: draftToHtml(convertToRaw(editor.getCurrentContent())),
            })
                .then((res) => {
                    history.goForward()
                    console.log(res)
                })
        },
    });

    const uploadCallback = async (file: any) => {

        let a: any = await new Promise(
            (resolve, reject) => {
                let reader = new FileReader();

                reader.onloadend = function () {
                    resolve({ data: { link: reader.result } })
                }
                reader.readAsDataURL(file);
            }
        );
        return a
    }

    return (
        <form onSubmit={formik.handleSubmit} className={css.wrapper}>
            <div className={css.categories}>
                <div>
                    <div className={css.title}>{t("category")}</div>
                    <Select onChange={(e) => setCategory(e)}
                        value={category}
                        styles={selectStyle}
                        placeholder={t("selectCategoryText")}
                        options={categoriesList} />
                </div>
                <div>
                    <div className={css.title}>{t("subCategory")}</div>
                    <Select onChange={(e: any) => setSubCategory(e)}
                        value={subCategory}
                        styles={selectStyle}
                        placeholder={t("selectCategoryText")}
                        options={subCategories} />
                </div>
                <div>
                    <div className={css.title}>{t("type")}</div>
                    <Select onChange={(e: any) => setType(e)}
                        value={type}
                        styles={selectStyle}
                        placeholder={t("selectCategoryText")}
                        options={types} />
                </div>
            </div>
            <div className={css.text_wrapper}>
                <div>
                    <div className={css.title}>{t("titleArticle")}</div>
                    <input
                        type={'text'}
                        className={css.title__input}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        name={'title'}
                        placeholder={`${t('titleArticleText')}.......`} />
                </div>
                <div>
                    <div className={css.title}>{t("descriptionArticle")}</div>
                    <Editor
                        editorState={editor}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName={css.editor}
                        onEditorStateChange={(e) => {
                            setEditor(e)
                        }}
                        toolbar={{
                            inline: { inDropdown: false },
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: true },
                            image: { uploadCallback: uploadCallback, preview_image: true, alt: { present: false, mandatory: false } },
                        }}
                    />
                </div>
            </div>
            <div className={css.btnWrapper}>
                <MainButton>{t("post")}</MainButton>
            </div>
        </form>
    )
}


export default AddArticle