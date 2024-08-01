import { useState } from "react";
import { TODO_ANY } from "../types/types";

export function useForm(inputValues = {}) {
    const [values, setValues] = useState<TODO_ANY>(inputValues);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange, setValues };
}