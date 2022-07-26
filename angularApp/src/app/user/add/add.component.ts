import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/form.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
imagePreview: any;
  constructor(public formService: FormService,
              public router : Router) { }

  ngOnInit(): void {
  }

  onSelectImage(event: any){
    const file = (event.target as HTMLInputElement).files[0]
    console.log(file.type)
    this.formService.form.patchValue({
      image: file,
    });

    const allowedFileType = ['image/png' ,'image/jpg'  ,'image/jpeg'];
if(file && allowedFileType.includes(file.type)){
 const reader = new FileReader()
 reader.onload = () => {
  this.imagePreview = reader.result as string
 }
reader.readAsDataURL(file)
}
  }

  onSubmit(){
    if(this.formService.form.value._id == '' ){
      this.formService.addUser(this.formService.form.value, this.formService.form.value.image)
      .subscribe((res: any) => {
        
      })
    }else{
      this.formService.updateUser(this.formService.form.value, this.formService.form.value.image)
      .subscribe((res: any) => {
      
      })
     
    }
    this.router.navigate(['user/list']);
    this.imagePreview = null;
  }
}
