import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ComplaintCard from "./ComplaintCard";


const SeeComplaint = () => {


    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        axios.get("/admin/getcomplaints")
            .then((response) => {
                console.log(response.data);
                setComplaints(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



    return (

        <>
            <div>
                {complaints.map((complaint) => (
                    <ComplaintCard
                        id={complaint.complaint_id}
                        name={complaint.name}
                        description={complaint.complaint_details}
                        date={complaint.complaint_date}
                    />
                ))}
            </div>
        </>
    );

};

export default SeeComplaint;