import React from "react"
import styles from "./Lobby.module.css"

const Label = ({ children, style }) => {
	return <div style = {style} className={styles.label}>
		{ children }
	</div>
}

const WaitingContainer = ({ children }) => {
	return <div className={styles.waitingContainer}>
		{ children }
	</div>
}

const LobbyCard = ({ isUserTeam = false, users = [] , teamName = '', onInputChange, onBtnClick }) => {
	return <div className={styles.cardContainer}>
		{  isUserTeam ? <input type='text' placeholder={teamName} onChange={onInputChange}/> : <div className={styles.teamName}>{teamName}</div> }
		<div className={styles.underContainer} style={isUserTeam ? { backgroundColor: '#FFFFFF4F', color: 'white'} : { backgroundColor: '#02020280', color: 'white'}}>
			<div className={styles.picture}/>
			{ users[0] ? <Label>{users[0].username}</Label> : <div className={styles.btn} onClick = {onBtnClick}>Rejoindre</div> }
			{ users[1] ? <Label className={styles.label}>{users[1].username}</Label> : < div className={styles.btn} onClick = {onBtnClick}>Rejoindre</div> }
		</div>
	</div>
}

export { LobbyCard, Label, WaitingContainer }
