import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { PostService } from '../post.service';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireStorage} from 'angularfire2/storage';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  title: string
  image: string = null
  content: string

  uploadPercent: Observable<number>
  downloadURL: Observable<string>
  buttonText: string = "Create Post"

  constructor(private auth: AuthService, private postService: PostService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    };
    this.postService.create(data)
    this.initialize()
    this.buttonText = 'Post Created!'
    setTimeout(() => this.buttonText = "Create Post", 3000)
  }

  initialize() {
    this.title = ''
    this.content = ''
  }

  uploadImage(event) {
    const file = event.target.files[0]
    const path = `posts/${file.name}`
    console.log(file)
    if(file.type.split('/')[0] != 'image') {
      return alert('only support image files')
    } else {
      const task = this.storage.upload(path, file)
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.storage.ref(path).getDownloadURL() 
          this.downloadURL.subscribe(url => this.image = url)
        })
     )
    .subscribe()
      this.uploadPercent = task.percentageChanges()
      console.log('Image Uploaded!') 
    }
  }
}
