import React, {useRef} from "react";
const UnControlledForms: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(inputRef.current?.value);
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" ref={inputRef} />
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default UnControlledForms;