import React, { useState, useEffect } from "react"

import Background from "../../pure-components/Background/Background"
import Title from "../../pure-components/Title/Title"
import Footer from "../../pure-components/Footer/Footer"
import { Container, Input, Button } from "../../pure-components/HomeForm/HomeForm"

import { useOutletContext, useNavigate } from "react-router-dom"
import { useUserStore } from "../../contexts/User"



const Create = () => {
	const socket = useOutletContext()
	const { user, modifyUser } = useUserStore()
	const navigate = useNavigate()

	useEffect(() => {
		socket.on("room:join:sucess", (roomID) => {
			navigate(`../room/${roomID}`)
		})

		return () => {
			socket.off("room:join:sucess")
		}
	}, [socket])

	const createGame = async () => {
		const res = await fetch("http://localhost:3001/room", { 
			method: 'POST', 
			headers: { contentType: 'application/json' },
			body: JSON.stringify({ pseudo: user.pseudo }) 
		}).then(res => res.json())
	
		if (res.error)
			return console.log("Error: ", res.error)
		
		socket.emit("room:join", res.roomID, user.pseudo)
	}
	
	return <Background>
		<Title>RAP CUP</Title>
			<Container>
				<Input label='Pseudo' onChange={e => modifyUser({ pseudo: e.target.value })}/>
				<Button onClick = {() => createGame()}>ENTER</Button>	
			</Container>
		<Footer/>
	</Background>
}

export default Create