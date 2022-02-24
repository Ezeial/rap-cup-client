import React from "react"
import styles from "./Lobby.module.css"

const LobbyCard = ({ isUserTeam = false, users = [] , teamName = '', onInputChange, onBtnClick }) => {
	return <div className={styles.cardContainer}>
		{  isUserTeam ? <input type='text' placeholder={teamName} onChange={onInputChange}/> : <div className={styles.teamName}>{teamName}</div> }
		<div className={styles.underContainer} style={isUserTeam ? { backgroundColor: '#FFFFFF4F', color: 'white'} : { backgroundColor: '#02020280', color: 'white'}}>
			<div className={styles.picture}/>
			{ users[0] ? <div className={styles.label}>{users[0].username}</div> : < div className={styles.btn} onClick = {onBtnClick}>Rejoindre</div> }
			{ users[1] ? <div className={styles.label}>{users[1].username}</div> : < div className={styles.btn} onClick = {onBtnClick}>Rejoindre</div> }
		</div>
	</div>
}

export { LobbyCard }
