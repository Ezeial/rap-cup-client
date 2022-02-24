import React from "react"
import { useUserStore } from "../../contexts/User"
import Background from "../../pure-components/Background/Background"
import Footer from "../../pure-components/Footer/Footer"
import Title from "../../pure-components/Title/Title"
import { LobbyCard } from "../../pure-components/Lobby/Lobby"
import { useOutletContext, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"

const Lobby = () => {
	const socket = useOutletContext()
	const { roomID } = useParams()
	const [room, setRoom] = useState()
	const { user } = useUserStore()

	useEffect(() => {
		socket.on("room:senddata", (newRoom) => {
			console.log("Room edited : ", newRoom)
			setRoom(newRoom)
		})

		socket.on("room:error", console.error)
		socket.emit("room:polldata", roomID)
		
		return () => {
			socket.off("room:senddata")
			socket.off("room:error")
		}
	}, [socket, roomID])

	return <Background>
		<Title>RAP CUP</Title>
		<div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', flexWrap: 'wrap'}}>
			{
				room && room.teams.map(team => {
					const players = room.players.filter(p => p.teamNumber === team.teamNumber)
					const isUserTeam = players.find(p => p.username === user.pseudo) ? true : false
					return <LobbyCard
					teamName={team.teamName}
					isUserTeam={isUserTeam} 
					users={players} 
					onInputChange={(e) => {
						socket.emit("room:team:rename", roomID, team.teamNumber, e.target.value)
					}}
					onBtnClick={() => {
						console.log(roomID, user.pseudo, team.teamNumber)
						socket.emit("room:team:join", roomID, user.pseudo, team.teamNumber)
					}}/>
				})
			}
		</div>
		<Footer/>
	</Background>
}

export default Lobby