import useSelector from "../../store/use-selector";
import { getProperty } from "../../utils";

export default function useLanguage() {
    
    const select = useSelector(state => ({
        app: state.language.app,
        language: state.language.language,
    }));

    return {
        language: select.language,
        translate: (key) => getProperty(select.app, key)
    };
}
