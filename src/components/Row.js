import React from 'react';
import stats, { filter, find } from '../data/stats';
import teams from '../data/teams';
import people from '../data/people';
import competitions from '../data/competitions'

const filteredCompetitions = competitions.filter((competition) => competition.competition_format !== "cup")


function Row() {
  function findTeam(team_id){
    const result = teams.find(element => element.team_id === team_id)
    return result.name;
  }
  
  function findCountry(team_id){
    const result = teams.find(element => element.team_id === team_id)
    return result.country;
  }
  
  function findCompetition(comp_id){
    const result = competitions.find(element => element.comp_id === comp_id)
    return result.name;
  }
  
  let cristiano = people[1];
  let personID = cristiano.person_id;
  let birthyear = cristiano.birth_date.split('-')[0]


  
  let ronaldoStats = stats.filter((element) => ((element.person_id === personID)) && filteredCompetitions.some((competition) => competition.comp_id === element.comp_id));
  let seasons = []
  for(const season of ronaldoStats) {
    seasons.push(season.season);
  }

  const uniqueSeasons = [...new Set(seasons)];

  let clubs = []
  for(const club of ronaldoStats) {
    const team = findTeam(club.team_id);
    clubs.push(team);
  }

  const uniqueClubs = [...new Set(clubs)]

  let ronaldoCompetitions = []
  for(const element of ronaldoStats) {
    const competition = findCompetition(element.comp_id)
    ronaldoCompetitions.push(competition)
  }

  const uniqueCompetitions = [...new Set(ronaldoCompetitions)];

  let tableData = [];
  let totalSeasons = uniqueSeasons.length;
  let totalClubs = uniqueClubs.length;
  let totalCompetitions = uniqueCompetitions.length;
  let totalGames = 0;
  let totalMinutes = 0;
  let totalGoals = 0;
  let totalAssists = 0;
  let totalGoalsPer90;
  
  for (const stat of ronaldoStats) {
    let seasonYear = stat.season.split('-')[0];
    const obj = {};
    obj.season = stat.season;
    obj.age = parseInt(seasonYear) - parseInt(birthyear);
    obj.team = findTeam(stat.team_id);
    obj.country = findCountry(stat.team_id);
    obj.competition = findCompetition(stat.comp_id);
    obj.games = stat.games;
    obj.minutes = stat.minutes;
    obj.goals = stat.goals;
    obj.assists = stat.assists;
    obj.goals90 = ((stat.goals/stat.minutes) * 90).toFixed(2)
  
    tableData.push(obj);
  
    tableData.sort((a,b) => {
      if (a.season < b.season) {
        return -1;
      }
      if (a.season > b.season) {
        return 1;
      }
      return 0;
    })

    totalGames = totalGames += stat.games;
    totalGoals = totalGoals += stat.goals;
    totalMinutes = totalMinutes += stat.minutes;
    totalAssists = totalAssists += stat.assists
    totalGoalsPer90 = ((totalGoals / totalMinutes) * 90).toFixed(2)
  }

  let rows = []

  for(const datum of tableData) {
    rows.push(
      <tr>
        <td>
        {datum.season}
        </td>
        <td>
          {datum.age}
        </td>
        <td>
          {datum.team}
        </td>
        <td>
          {datum.country}
        </td>
        <td>
          {datum.competition}
        </td>
        <td>
          {datum.games}
        </td>
        <td>
          {datum.minutes}
        </td>
        <td>
          {datum.goals}
        </td>
        <td>
          {datum.assists}
        </td>
        <td>
          {datum.goals90}
        </td>
        </tr>
    )
  }

  rows.push(<tr>
    <td>{totalSeasons} Seasons</td>
    <td></td>
    <td>{totalClubs} Clubs</td>
    <td></td>
    <td>{totalCompetitions} Competitions</td>
    <td>{totalGames}</td>
    <td>{totalMinutes}</td>
    <td>{totalGoals}</td>
    <td>{totalAssists}</td>
    <td>{totalGoalsPer90}</td>
    </tr>)



  return (
   rows
  )
} 
export default Row;