import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-postpage',
  templateUrl: './postpage.component.html',
  styleUrls: ['./postpage.component.css']
})
export class PostpageComponent {
  loginUserId:number=11;
  profiledata:any;
  requeststatus:boolean=true;
  postdata!:any;
  likedpost:any[]=[];
  id:number=0;
  commentText!:string;
  commentbox:boolean=false;
  commentboxId!:number
  commentsdata!:any
  showcomment:boolean=false;
  subcommentbox:boolean=false;
  subcommentboxId!:any;
  req_object={
    followerId: this.loginUserId,
    followingId: 0,
    connectionStatus: "string"
  }

  like_object={
    userId: this.loginUserId,
    postId: 0,
    likeStatus: 0
  }

  comment_object={
    userId:this.loginUserId,
    postId:0,
    commentText:""
  }

  constructor(private api:ApiService){
    this.api.usersuggestion(11).subscribe(x=>{
      this.profiledata=this.api.dataparser(x)
    })
    this.api.homepagepost(11).subscribe(x=>{
      this.postdata=this.api.dataparser(x);
    })
    
  }
  async ngOnInit(){
    try{
    var res=await this.api.usersuggestion(11).toPromise();
      this.profiledata=this.api.dataparser(res)
    }
    catch{
      console.log("A");  
    }
  }

  like(id:number){
    this.like_object.postId=id;
    this.api.likepost(this.like_object).subscribe(x=>{
      this.api.homepagepost(11).subscribe(x=>{
      this.postdata=this.api.dataparser(x)
      })
    })
  }

  request(id:number){
    alert(id)
    this.req_object.followingId=id;
    this.api.followrequest(this.req_object).subscribe(x=>{
     console.log(x);
    })
  }

  showComments(postid:number){
    this.api.getcomment(postid).subscribe(x=>{
      this.commentsdata=x;
    })
      this.showcomment=true;
  }


  comment(postId:number){

      this.commentbox=true;
    
  
    this.commentboxId=postId;
  }


  SubmitComment(postId:number){
    this.comment_object.postId=postId;
    this.comment_object.commentText=this.commentText
    this.api.postcomment(this.comment_object).subscribe(x=>{
      this.api.homepagepost(11).subscribe(x=>{
        this.postdata=this.api.dataparser(x);
      })
      this.api.getcomment(postId).subscribe(x=>{
        this.commentsdata=x;
      })
    })
    this.commentText=''
  }


  Subcomment(commentId:number){
    this.subcommentboxId=commentId; 
    this.subcommentbox=true;
  }
}