import React from 'react';
import Child1 from './Child1';
const Parent1:React.FC = () => {
    const [age, setAge] = React.useState<number>(0);
    const [msg,setMsg] = React.useState<string>("");
    const handleAgeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setAge(Number(e.target.value));
    };
    let isClicked =false;
    const onButtonClick = () => {
        if(age<18){
            isClicked = true;
            setMsg("You are a Child");
        }else if(age>=18 && age<20){
            isClicked = true;
            setMsg("You are a Teen");
        }else if (age>=20 && age<30){
            isClicked = true;
            setMsg("You are a Young");
        }else {
            isClicked = true;
            setMsg("You are Old");
        }
    };
    return (

        <>
            <div style={{ border: '1px solid black',backgroundColor: 'lightgreen', padding: '10px', margin: '10px' }}>
                <label htmlFor="age">Enter your age</label>
                <input type="number" id="age" value={age} onChange={handleAgeChange} />
                <Child1 msg={msg} age={age} isClicked={isClicked} onButtonClick={onButtonClick}/>
            </div>
        </>
    );
};
export default Parent1;