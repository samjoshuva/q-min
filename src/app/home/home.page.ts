import { UtilsService } from './../service/utils/utils.service';
import { Post } from './../../models/post';
import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  postCollection: AngularFirestoreCollection<Post>;
  posts: any;
  private postDoc: AngularFirestoreDocument<Post>;

  user_id = 'shdfhsdi';

  des: string;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private util: UtilsService,
    private storage: Storage
  ) {
    // reference to post collection on firestore
    this.postCollection = afs.collection<Post>('posts/');
    // actual post data
    this.posts = this.postCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    console.log(this.posts);
  }

  ngOnInit() {
    this.storage.get('user-info').then(val => {
      console.log(val);
    });
  }

  addPost() {
    if (this.des.length === 0) {
      this.util.presentToast('write somethig to post');
      return;
    }
    this.postCollection.add({
      user_id: this.user_id,
      description: this.des
    });
    this.des = '';
  }

  deletePost(id: any) {
    console.log(id);
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    this.postDoc.delete();
  }

  navAccount() {
    this.router.navigate(['/account']);
  }
}
