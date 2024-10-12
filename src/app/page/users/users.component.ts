import { UserService } from './../../service/user.service';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/material/material';
import { map } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tableUserInfo } from '../../model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<tableUserInfo>([]);
  headColumns: string[] = [];
  userService = inject(UserService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {

    this.route.data.pipe(
      map((res: any) => {
        // 確保返回結果
        return (res['users'].users as any[]).map(({ id, username, age, gender, email, phone }) => {
          return {
            No: id,
            username,
            age,
            gender,
            email,
            phone
          };
        });
      })
    ).subscribe((data: any) => {
      console.log("data", data);
      this.dataSource.data = data;
      this.setTableHeader(data[0]);
    });
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setTableHeader(data: tableUserInfo) {
    this.headColumns = Object.keys(data);
  }
}