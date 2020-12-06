import Model from './Model';
import jsonPlaceholderDb from '../API/jsonPlaceholder';

var memberModel = new Model({ collectionName: 'members', docName: 'member' });

export async function getMembers() {
	return memberModel.getCollectionDocs();
}

export async function createMember(newMember) {
	return memberModel.createDoc(newMember);
}

export async function updateMember(memberId, memberDetails) {
	return memberModel.updateDoc(memberId, memberDetails);
}

export async function deleteMember(memberId) {
	memberModel.deleteDoc(memberId);
}

export async function addMemberSubscription(subscriptionDetails) {
	var { memberId, movieId, date } = subscriptionDetails;
	var member = members.find(currMember => currMember.id == memberId);
	member.movies = [...member.movies, { movieId, date }];
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([...members]);
		}, 0);
	});
}

export async function resetMembers() {
	var originalMembers = await jsonPlaceholderDb.get('/users');

	var members = originalMembers.data.map(member => {
		return {
			city: member.address.city,
			email: member.email,
			name: member.name,
		};
	});
	memberModel.createDocs(members);
}
