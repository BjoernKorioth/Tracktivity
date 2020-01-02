import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {User} from '../../model/user';


@Injectable()
export class AuthenticateService {

    private user: User;

    private list: AngularFireList<any>;

    constructor(private fireDatabase: AngularFireDatabase) {
    }

    /**
     * registerUser
     *
     * creates a new user in the firebase authentication service and the database
     *
     * @param value contains the contents of the registration form
     */
    registerUser(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(
                    // If the auth service could create the new user, we'll enter this function
                    (userCredential) => {
                        // We get a user credential returned, from which we extract the user
                        const user = userCredential.user;
                        // Now, we can create a new user object with the provided information
                        this.user = new User(user.uid, value.firstname + ' ' + value.surname);
                        // Try to create the user on the database
                        this.registerOnDatabase().then(
                            // If this is successful, resolve the promise
                            res => resolve(res),
                            // If it's not successful, the user was created with the auth service but not in the database
                            err => reject(err)
                        );
                    },
                    err => reject(err));
        });
    }

    registerOnDatabase() {
        return this.fireDatabase.database.ref().child('users').child(this.user.id).set(this.user.toFirebaseObject());
    }

    loginUser(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(
                    res => resolve(res),
                    err => reject(err));
        });
    }

    logoutUser() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                firebase.auth().signOut()
                    .then(() => {
                        console.log('LOG Out');
                        resolve();
                    }).catch((error) => {
                    reject(error);
                });
            }
        });
    }

    userDetails() {
        return firebase.auth().currentUser;
    }

    loggedUserDetails() {
        // TODO this function is called in the menu page, it returns an error.
        // this could be because the function is called before the user variable is set in this controller
        return ''; // this.user.name || 'not found';
    }
}

