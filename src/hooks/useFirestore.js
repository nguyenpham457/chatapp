import { useEffect,useState } from "react";
import { collection, onSnapshot,query,where,orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

const useFireStore = (collectionData, condition) => {
    const [documents,setDocuments] = useState([]);

    useEffect(()=>{
        let collectionRef = collection(db, collectionData);
        let queryCollection;
        if(condition){
            const {fieldName, operator,compareValue} = condition
            if(!compareValue || !compareValue.length){
                setDocuments([]);
                return;
            }
        queryCollection =  query(collectionRef,where(fieldName,operator,compareValue))
        } else {
        queryCollection = query(collectionRef)
        }

        const unsubscribed = onSnapshot(queryCollection, (snapshot) => {
            
            const data = snapshot.docs.map(doc =>{
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            setDocuments(data)
        });
        return unsubscribed;
    },[collectionData, condition])
    
    return documents;
}


export default useFireStore;