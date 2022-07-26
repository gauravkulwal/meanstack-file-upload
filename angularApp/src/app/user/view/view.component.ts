import { Component, OnInit } from '@angular/core';
import { FormService } from '../../shared/form.service';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
dataSource: any = [];
displayedColumns: string[] = ['image', 'name', 'fatherName', 'city' , 'mobile' , 'action'];


  constructor(public formService: FormService,
              public router: Router) { }

  ngOnInit(): void {
    this.getUserForm();
  }
getUserForm(){
  this.formService.getUser().subscribe((res: any) => {
     this.dataSource = new MatTableDataSource(res);
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
onDelete(id: string){
  this.formService.deleteUser(id).subscribe((res: any) => {
    console.log(res);
  })
  this.getUserForm();
}
onUpdate(user: any){
  this.router.navigate(['user/create']);
  this.formService.form = new FormGroup({
    _id: new FormControl(user._id),
    name: new FormControl(user.name),
fatherName: new FormControl(user.fatherName),
city: new FormControl(user.city),
mobile: new FormControl(user.mobile),
image:  new FormControl(user.image)
  })
}
}
