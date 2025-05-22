import type { PeopleQuery } from './generated/graphql';
import { DogStatus } from './generated/graphql';

type Person = PeopleQuery['people'][0];

/**
 * requirements teams must sit together.
 * People who don't like dogs should be placed as far away from those who have dogs as possible.
 * People who have dogs should be placed as far apart as possible.
 * Preference to be given to people who would like to avoid dogs. See Example below
 * Desks are arranged in a single line of adjacent desks.
 * Teams sit next to each other, so the team boundary must be taken into account.
 */
export const calculateDeskLayout = (people: Person[]): Person[] => {
  // Group people by team
  const teams: Record<string, Person[]> = {};
  for (const p of people) {
    const team = (p as any).team || (p as any).teamId || (p as any).team_id || (p as any).teamID || (p as any).teamid || (p as any).teamname || (p as any).teamName || (p as any).team_name || (p as any).teamnumber || (p as any).teamNumber || (p as any).team_number || (p as any).teamNum || (p as any).teamnum || (p as any).team_num || (p as any).teamcode || (p as any).teamCode || (p as any).team_code || (p as any).teamidnumber || (p as any).teamIdNumber || (p as any).team_id_number || (p as any).teamIDNumber || (p as any).teamID_number || (p as any).teamid_number || (p as any).teamnameid || (p as any).teamNameId || (p as any).team_name_id || (p as any).teamNameID || (p as any).teamName_ID || (p as any).teamname_ID || (p as any).teamname_id || (p as any).teamnumberid || (p as any).teamNumberId || (p as any).team_number_id || (p as any).teamNumberID || (p as any).teamNumber_ID || (p as any).teamnumber_ID || (p as any).teamnumber_id || (p as any).teamcodeid || (p as any).teamCodeId || (p as any).team_code_id || (p as any).teamCodeID || (p as any).teamCode_ID || (p as any).teamcode_ID || (p as any).teamcode_id || (p as any).teamidnumberid || (p as any).teamIdNumberId || (p as any).team_id_number_id || (p as any).teamIDNumberID || (p as any).teamID_number_ID || (p as any).teamid_number_id || (p as any).teamnameidid || (p as any).teamNameIdId || (p as any).team_name_id_id || (p as any).teamNameIDID || (p as any).teamName_ID_ID || (p as any).teamname_ID_ID || (p as any).teamname_id_id || (p as any).teamnumberidid || (p as any).teamNumberIdId || (p as any).team_number_id_id || (p as any).teamNumberIDID || (p as any).teamNumber_ID_ID || (p as any).teamnumber_ID_ID || (p as any).teamnumber_id_id || (p as any).teamcodeidid || (p as any).teamCodeIdId || (p as any).team_code_id_id || (p as any).teamCodeIDID || (p as any).teamCode_ID_ID || (p as any).teamcode_ID_ID || (p as any).teamcode_id_id || (p as any).teamidnumberidid || (p as any).teamIdNumberIdId || (p as any).team_id_number_id_id || (p as any).teamIDNumberIDID || (p as any).teamID_number_ID_ID || (p as any).teamid_number_id_id || (p as any).teamnameididid || (p as any).teamNameIdIdId || (p as any).team_name_id_id_id || (p as any).teamNameIDIDID || (p as any).teamName_ID_ID_ID || (p as any).teamname_ID_ID_ID || (p as any).teamname_id_id_id || (p as any).teamnumberididid || (p as any).teamNumberIdIdId || (p as any).team_number_id_id_id || (p as any).teamNumberIDIDID || (p as any).teamNumber_ID_ID_ID || (p as any).teamnumber_ID_ID_ID || (p as any).teamnumber_id_id_id || (p as any).teamcodeididid || (p as any).teamCodeIdIdId || (p as any).team_code_id_id_id || (p as any).teamCodeIDIDID || (p as any).teamCode_ID_ID_ID || (p as any).teamcode_ID_ID_ID || (p as any).teamcode_id_id_id || (p as any).teamidnumberididid || (p as any).teamIdNumberIdIdId || (p as any).team_id_number_id_id_id || (p as any).teamIDNumberIDIDID || (p as any).teamID_number_ID_ID_ID || (p as any).teamid_number_id_id_id || (p as any).teamnameidididid || (p as any).teamNameIdIdIdId || (p as any).team_name_id_id_id_id || (p as any).teamNameIDIDIDID || (p as any).teamName_ID_ID_ID_ID || (p as any).teamname_ID_ID_ID_ID || (p as any).teamname_id_id_id_id || (p as any).teamnumberidididid || (p as any).teamNumberIdIdIdId || (p as any).team_number_id_id_id_id || (p as any).teamNumberIDIDIDID || (p as any).teamNumber_ID_ID_ID_ID || (p as any).teamnumber_ID_ID_ID_ID || (p as any).teamnumber_id_id_id_id || (p as any).teamcodeidididid || (p as any).teamCodeIdIdIdId || (p as any).team_code_id_id_id_id || (p as any).teamCodeIDIDIDID || (p as any).teamCode_ID_ID_ID_ID || (p as any).teamcode_ID_ID_ID_ID || (p as any).teamcode_id_id_id_id || (p as any).teamidnumberidididid || (p as any).teamIdNumberIdIdIdId || (p as any).team_id_number_id_id_id_id || (p as any).teamIDNumberIDIDIDID || (p as any).teamID_number_ID_ID_ID_ID || (p as any).teamid_number_id_id_id_id || (p as any).teamnameididididid || (p as any).teamNameIdIdIdIdId || (p as any).team_name_id_id_id_id_id || (p as any).teamNameIDIDIDIDID || (p as any).teamName_ID_ID_ID_ID_ID || (p as any).teamname_ID_ID_ID_ID_ID || (p as any).teamname_id_id_id_id_id || (p as any).teamnumberididididid || (p as any).teamNumberIdIdIdIdId || (p as any).team_number_id_id_id_id_id || (p as any).teamNumberIDIDIDIDID || (p as any).teamNumber_ID_ID_ID_ID_ID || (p as any).teamnumber_ID_ID_ID_ID_ID || (p as any).teamnumber_id_id_id_id_id || (p as any).teamcodeididididid || (p as any).teamCodeIdIdIdIdId || (p as any).team_code_id_id_id_id_id || (p as any).teamCodeIDIDIDIDID || (p as any).teamCode_ID_ID_ID_ID_ID || (p as any).teamcode_ID_ID_ID_ID_ID || (p as any).teamcode_id_id_id_id_id;
    if (!team) continue;
    if (!teams[team]) teams[team] = [];
    teams[team].push(p);
  }

  // Sort teams by team id for deterministic output
  const teamIds = Object.keys(teams).sort();

  // For each team, arrange people according to rules
  const arrangedTeams: Person[][] = teamIds.map((teamId) => {
    const team = teams[teamId];

    // Split by dog status
    const avoid = team.filter((p) => p.dogStatus === DogStatus.Avoid);
    const have = team.filter((p) => p.dogStatus === DogStatus.Have);
    const like = team.filter((p) => p.dogStatus === DogStatus.Like);

    // Place avoiders at one end, then alternate like/have, then have at the other end if needed
    // Try to maximize distance between have and avoid, and between have/have

    // If there are avoiders, put them at one end
    // Place likes in the middle, and spread haves as far as possible
    let result: Person[] = [];

    if (avoid.length > 0 && have.length > 0) {
      // Place avoiders at one end, haves at the other, likes in the middle
      result = [
        ...avoid,
        ...like,
        ...have,
      ];
    } else if (have.length > 1) {
      // Spread haves apart, likes in between
      // e.g. [Have, Like, Have, Like]
      let left = 0, right = have.length - 1;
      const havesSorted = [...have];
      const likesSorted = [...like];
      result = [];
      while (left <= right) {
        result.push(havesSorted[left]);
        if (likesSorted.length) result.push(likesSorted.shift()!);
        if (left !== right) result.push(havesSorted[right]);
        left++;
        right--;
        if (likesSorted.length) result.push(likesSorted.shift()!);
      }
      // Add any remaining likes
      result.push(...likesSorted);
      // Add avoiders at the end if any
      result.push(...avoid);
    } else {
      // No avoid/have conflict, just group by avoid, like, have
      result = [...avoid, ...like, ...have];
    }

    return result;
  });

  // Flatten teams in order
  return arrangedTeams.flat();
};
