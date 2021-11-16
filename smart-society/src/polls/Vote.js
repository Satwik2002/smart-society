import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Contents from "../navigation/Contents";
import { useNavigate } from "react-router";
import { useFormik } from 'formik';

function Vote() {
    let navigate = useNavigate();
    const { id } = useParams();

    // const [msg, setMsg] = useState("");
    const [poll, setPoll] = useState({
        title: "Loading...",
        question: "loading",
        options: "loading..."
    });
    const formik = useFormik({
        initialValues: {
            decision: "",
        },
        onSubmit: async (values, { resetForm }) => {
            if (!window.confirm("Are you sure ?\nYou have selected : \"" + values.decision + "\"")) return;
            const response = await fetch(`http://127.0.0.1:8000/api/polls/vote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Token ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ decision: values.decision })
            });
            const obj = await response.json();
            console.log(response.ok)
            alert(obj.status);
            navigate('/polls');
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/polls/${id}`, {
                    headers: {
                        authorization: `Token ${localStorage.getItem("token")}`,
                    },
                });
                const obj = await response.json();
                setPoll(obj);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id]);

    console.log(poll);
    return (
        <div className="h-screen flex">
            <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
                <Contents />
            </div>
            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 overflow-y-scroll">
                    <div className="md:py-5 flex-grow py-3 text-center dark:text-white uppercase tracking-wider font-semibold text-xl md:text-3xl">
                        Vote
                    </div>
                    <div className="mx-3 lg:mx-10 border rounded bg-black flex items-center justify-center">
                        <div className="bg-white w-full rounded shadow-lg pt-8 pb-4 px-6 md:p-8">
                            <div className="flex justify-between font-semibold text-gray-800">
                                <h2 className="md:text-2xl mb-2">{poll.title}</h2>
                            </div>
                            <div className="grid gap-4 gap-y-2 grid-cols-1 lg:grid-cols-2">
                                <div className="lg:col-span-2">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div class="block">
                                            <span class="text-gray-700">
                                                {poll.question.split('\n') && poll.question.split("\n").map((i, index) => {
                                                    return <p key={index}>{i}</p>;
                                                })
                                                }
                                            </span>
                                            <div class="mt-2">
                                                {poll.options.split(';').map((option, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <label class="inline-flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    class="form-radio"
                                                                    name="decision"
                                                                    value={option}
                                                                    onChange={formik.handleChange}
                                                                />
                                                                <span class="ml-2">{option}</span>
                                                            </label>
                                                        </div>
                                                    )
                                                })
                                                }
                                            </div>
                                        </div>
                                        <div className="grid gap-4 gap-y-4 grid-cols-1 md:grid-cols-2">
                                            {/* <div className="md:col-span-2 text-center md:row-start-4 text-red-500">
                                                    {msg}
                                                </div> */}
                                            <div className="md:col-span-2 text-right md:row-start-5">
                                                <div className="inline-flex items-end">
                                                    <button
                                                        type="submit"
                                                        className="bg-green-400 hover:bg-green-600 text-white font-bold my-3 py-2 px-4 rounded"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

// Vote.propTypes = {
// };

export default Vote;

/*
<div className="h-screen flex">
            <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
                <Contents />
            </div>
            <div className={`${bgColor} p-6 rounded-lg shadow-md divide-y-2 ${divideColor} divide-solid my-5 md:my-10 `}>
                <div className="flex justify-between font-semibold text-gray-800">
                    <h2 className="md:text-2xl mb-2">{poll.title}</h2>
                </div>
                <div className="text-gray-700 py-3">
                    {poll.question.split('\n') && poll.question.split("\n").map((i, index) => {
                        return <p key={index}>{i}</p>;
                    })}
                </div>
                <Formik
                    initialValues={{
                        decision: '',
                    }}
                    onSubmit={async (values, { resetForm }) => {
                        if (!window.confirm("Are you sure ?\nYou have selected : \"" + values.decision + "\"")) return;
                        const response = await fetch(`http://127.0.0.1:8000/api/polls/vote/${id}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: `Token ${localStorage.getItem("token")}`,
                            },
                            body: JSON.stringify({ decision: values.decision })
                        });
                        const obj = await response.json();
                        console.log(response.ok)
                        if (response.ok) {
                            alert(obj.status);
                            navigate("/polls");
                        }
                        else {
                            setMsg(obj.status)
                            resetForm();
                        }
                    }}
                >
                    {({ values }) => (

                        <Form>
                            {poll.options.split(';').map((option, index) => {
                                return (
                                    <div key={index}>
                                        <label>
                                            <Field type="radio" name="decision" value={option} required />
                                            {option}
                                        </label>
                                        <br />
                                    </div>
                                )
                            })
                            }
                            <div>Picked: {values.decision}</div>

                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
                <div className="text-center text-black dark:text-white">{msg}</div>
            </div>
        </div>
*/