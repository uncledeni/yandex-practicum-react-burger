import { useState } from "react";
import { TODO_ANY } from "../types/types";

export function useForm(inputValues = {}) {
    const [values, setValues] = useState<TODO_ANY>(inputValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange, setValues };
}