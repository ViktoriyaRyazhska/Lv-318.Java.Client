import { Component, Input, OnInit } from '@angular/core';
import { MyComment } from '../../../../../../../../../models/comment.model';
import { CommentService } from '../../../../../../../../../services/comment.service';
import { HttpEventType, HttpParams, HttpResponse } from '@angular/common/http';
import { UserInfo } from '../../../../../../../../../models/userInfo.model';
import { UserService } from '../../../../../../../../../services/user.service';
import { MatSnackBar } from '@angular/material';
import {CustomAuthService} from '../../../../../../../../../services/auth/custom-auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  @Input() comment: MyComment;
  modified: boolean;
  replyCommentText: string;
  postCommentDate: string;
  modifiedCommentDate: string;

  currentFileUpload: File;
  selectedFiles: FileList;
  progress: { percentage: number } = {percentage: 0};

  successMessage = 'Reply posted';
  failedMessage = 'Empty comment';
  loginMessage = 'Please, log in';
  action = 'Hide';

  childComments: MyComment[];
  userInfo: UserInfo = new UserInfo();

  constructor(private commentService: CommentService,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private authService: CustomAuthService) {
  }

  ngOnInit() {
    this.modified = this.comment.modifiedDate != null;
    this.postCommentDate = this.calculateTimeDiffBetweenNowAndDate(new Date(this.comment.postDate));
    this.modifiedCommentDate = new Date(this.comment.modifiedDate).toString();

    if (this.comment.parent) {
      this.getChildrenComments();
    }
    this.getUserInfo();
  }

  getChildrenComments() {
    this.commentService.getChildrenComments(this.comment.id)
      .subscribe(childComments => {
        this.childComments = childComments;
      });
  }

  addChildComment() {
    if (this.authService.hasToken()) {
      if (this.replyCommentText) {
        const replyComment = new MyComment();
        replyComment.commentText = this.replyCommentText;
        let params = new HttpParams();
        params = params.set('transitId', this.comment.transitId.toString());
        params = params.set('userId', this.authService.getUserId().toString());
        params = params.set('parentId', this.comment.id.toString());
        this.commentService.addComment(params, replyComment)
          .subscribe(comment => {
            this.getChildrenComments();
            this.uploadPics(comment);
          });
        this.toggleReply();
        this.openSnackBar(this.successMessage);
      } else {
        this.openSnackBar(this.failedMessage);
      }
    } else {
      this.openSnackBar(this.loginMessage);
    }
  }

  getUserInfo() {
    this.userService.getUserInfo(this.comment.userId)
      .subscribe(userInfo => this.userInfo = userInfo);
  }

  calculateTimeDiffBetweenNowAndDate(end: Date): string {
    const nowTimeInSec = Date.now();
    const postCommentDateInSec = end.getTime();
    const timeDiffInMs = (nowTimeInSec - postCommentDateInSec);
    const timeDiffInMin = timeDiffInMs / 1000 / 60;
    const timeDiffInHours = timeDiffInMin / 60;
    const timeDiffInDays = timeDiffInHours / 24;

    if (timeDiffInMin < 60) {
      return `${Math.round(timeDiffInMin)} minutes ago`;
    }
    if (timeDiffInMin >= 60 && timeDiffInHours < 24) {
      return `${Math.round(timeDiffInHours)} hours ago`;
    }
    if (timeDiffInHours >= 24) {
      return `${Math.round(timeDiffInDays)} days ago`;
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, this.action, {
      duration: 2000,
    });
  }

  toggleReply() {
    const replyElement = document.getElementById(this.comment.id.toString());
    if (replyElement.style.display === 'block') {
      replyElement.style.display = 'none';
    } else {
      replyElement.style.display = 'block';
    }
  }

  openChooseDialog(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }

    console.log(this.selectedFiles);
  }

  uploadPics(comment: MyComment) {
    console.log('uploading');

    const subDir = `subDir=transitId${comment.transitId}/commentId${comment.id}`;

    for (let i = 0; i < this.selectedFiles.length; i++) {
      console.log('state ' + i + ', ' + this.selectedFiles.item(i).name);
      this.commentService.uploadFile(this.selectedFiles.item(i), subDir).subscribe(res => console.log(res));
    }

    this.selectedFiles = undefined;
  }


}
