export const createProject = (project) => {
  return  (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({type: 'CREATE_PROJECT', project });
    }).catch((err) => {
      dispatch({type: 'CREATE_PROJECT_ERROR', err });
    })
  }
};

export const deleteProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('projects')
      .where('createdAt', '==', project.createdAt)
      .where('authorId', '==', project.authorId).get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          })
        dispatch({type: 'DELETE_PROJECT', project});
      })
      .catch((err) => {
        dispatch({type: 'DELETE_PROJECT_ERROR', err });
      })
  }
};