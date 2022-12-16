import { useEffect,useState } from "react";
import { collection, onSnapshot,query,where,limit,orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

const useFireStore = (collectionData, condition,limitData = 10,orderByData) => {
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
        queryCollection =  query(collectionRef,where(fieldName,operator,compareValue),limit(limitData))
        } else {
        queryCollection = query(collectionRef,limit(limitData))
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
    },[collectionData, condition,limitData])
    
    return documents;
}

export const useFireStoreWithOrderBy = (collectionData, condition,limitData = 10,orderByData) => {
    const [documents,setDocuments] = useState([]);
    useEffect(()=>{
        let collectionRef = collection(db, collectionData);
        let queryCollection;
        if(condition){
            const {fieldName, operator,compareValue} = condition;
            const {orderByName,orderByDirection} = orderByData;
            if(!compareValue || !compareValue.length){
                setDocuments([]);
                return;
            }
        queryCollection =  query(collectionRef,where(fieldName,operator,compareValue),limit(limitData)
        ,orderBy(orderByName,orderByDirection))
        } else {
        queryCollection = query(collectionRef,limit(limitData))
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
    },[collectionData, condition,limitData,orderByData])
    
    return documents;
}


export default useFireStore;