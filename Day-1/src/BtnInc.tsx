import React, {useState} from "react";
const BtnInc: React.FC = () => {
    // let c = 0;
    // const inc = () => {
    //     document.getElementById("count")!.textContent = (c++).toString();
    // }
    // const [count,setCount] = useState(0);
    // const increment = () => {
    //     setCount(count + 1);
    // }
    // const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     console.log("Button clicked");
    // }
    const [name, setName] = useState("");
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    return (
        
        <>
            {/* <button onClick={inc}>Increment</button>
            <p>Count: <span id="count">{c}</span></p>


            <button onClick={increment}>Increment By useState</button>
            <p>Count: {count}</p> */}

            {/* <button onClick={click}>Click Me</button> */}

            <input type="text" onChange={handleNameChange}/>
            <p>Name: {name}</p>
        </>
    )
}

export default BtnInc;