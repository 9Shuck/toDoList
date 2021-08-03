import { data } from "jquery";
import React, { useEffect, useState } from "react";
import Task from "./task.jsx";

const Home = () => {
	const [dataApi, setDataApi] = useState([]);
	const [newList, setNewList] = useState("");
	//API-GET (List of objects)
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/9shuck", {
			method: "GET"
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				setDataApi(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);
	//Render
	useEffect(() => {
		if (dataApi.length) {
			setNewList(
				dataApi.map((dataApi, index) => {
					return (
						<Task
							text={dataApi.label}
							id={index}
							key={index.toString()}
							delete={deleteApi}
						/>
					);
				})
			);
		}
	}, [dataApi]);
	//API-PUT
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/9shuck", {
			method: "PUT",
			body: JSON.stringify(dataApi),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp);
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [dataApi]);

	//Delete
	const deleteApi = indexDelete => {
		setDataApi(dataApi.filter((_, index) => index !== indexDelete));
	};

	//Main
	return (
		<div className="container text-center mt-5">
			<h1>To Do List</h1>
			<form
				onSubmit={e => {
					e.preventDefault();
				}}>
				<input
					id="task"
					name="task"
					className="form-control"
					type="text"
					placeholder="Add something to do..."
					onKeyPress={e => {
						if (e.target.value != " ") {
							if (e.key === "Enter") {
								{
									setDataApi([
										...dataApi,
										{ label: e.target.value, done: false }
									]);
									e.target.value = "";
								}
							}
						}
					}}></input>
			</form>
			<div className="listBox">
				<ol>{newList}</ol>
			</div>
		</div>
	);
};

export default Home;
