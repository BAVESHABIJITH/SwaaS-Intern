import React, { useState } from "react";
const FormEvent: React.FC = () => {
    const [name, setName] = useState<string>("");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name);
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default FormEvent;