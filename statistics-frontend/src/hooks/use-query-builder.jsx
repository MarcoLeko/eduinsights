import { useCallback, useEffect, useState } from "react";
import { getUISCategories, } from "../components/shared/thunks";
import { receiveMessageInterceptor } from "../context/alert-actions";
import { useAlertContext } from "./use-alert-context";

export function useQueryBuilder() {
    const [categoriesList, setCategoriesList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { dispatch } = useAlertContext();

    const fetchInitialUISCategories = useCallback(() => {
        getUISCategories()
            .then((categories) => {
                setCategoriesList(categories);
            })
            .catch((e) => dispatch(receiveMessageInterceptor(e)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!categoriesList.length) {
            fetchInitialUISCategories();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        categoriesList,
        selectedCategory,
        setSelectedCategory
    };
}
