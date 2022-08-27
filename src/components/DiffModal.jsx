import React from "react";
import { Dialog } from "@headlessui/react";

export default function DiffModal(props){
    const buttons = props.diffs.map((obj, index) =>(
        <button 
        key={index}
        className={obj.isSelected?"modal--button modal-selected":"modal--button"}
        onClick={() => props.sm(props.modalChoose(obj.value))}
        >
            {obj.value.charAt(0).toUpperCase() + obj.value.slice(1)}
        </button>
    ))



    return(
        
        <Dialog open={props.show} onClose={props.close} className="modal-bg">
            <div className="modal--bg">
                <Dialog.Panel className="modal">
                <Dialog.Title>Change Difficulty</Dialog.Title>
                <div className="modal--buttons">
                    {buttons}
                </div>
                <button className="modal--button modal-save" onClick={props.close}>Save</button>
                </Dialog.Panel>
            </div>
        </Dialog>
    
    )
}