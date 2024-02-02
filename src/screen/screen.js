import axios from "axios";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";


const Screen = () => {
    const [data, setData] = useState("");
    const [detailVisible, setDetailVisible] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users')
            .then((res) => {
                console.log("res", res?.data)
                setData(res?.data || []);
                setLoading(false)
            })
            .catch(err => {
                setError("No Data available")
                console.log("error", err)
            }
            );
    }, [])

    const toggleDetails = (index) => {
        setDetailVisible(index === detailVisible ? null : index);
    }

    return (
        <div className="container">
            <div className="heading">
                <h1>User List</h1>
            </div>
            {loading && (
                <div className="spinner">
                    <Bars
                        height="80"
                        width="80"
                        color="#8a2be2"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            )}
            {!loading && !error && data.length === 0 && <p>No data to show</p>}
            {!loading && error && <p>{error}</p>}
            {!loading && !error && data.length > 0 &&
                data.map((user, index) => {
                    return (
                        <div className="list">
                            <div className="profile-img">
                                <div className="image">
                                    <img src={user?.avatar}
                                        alt=" avatar"
                                    />
                                </div>
                                <p>{user?.profile?.firstName + " " + user?.profile?.firstName}</p>
                                <button onClick={() => toggleDetails(index)}>
                                    {detailVisible === index ? "Hide Details" : "Show Details"}
                                </button>

                            </div>
                            {detailVisible === index && (
                                <div className="user-details"  >
                                    <p>Job Title : {user?.jobTitle}</p>
                                    <p>Email : {user?.profile?.email}</p>
                                    <p>Bio : {user?.Bio}</p>
                                </div>
                            )}
                        </div>


                    )
                })
            }
        </div>
    )
}

export default Screen;