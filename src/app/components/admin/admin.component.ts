import {Component, OnInit} from '@angular/core';
import {ExcategoryService} from '../../services/excategory.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ExcategoryModel} from '../../models/excategory.model';
import {MatDialog} from '@angular/material';
import {UpdateRoleComponent} from './update-role/update-role.component';
import {AddCategoryComponent} from './add-category/add-category.component';
import {AddFeedbackCriteriaComponent} from './feedback-criteria/add-feedback-criteria/add-feedback-criteria.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public list: Observable<ExcategoryModel[]> = this.service.getTopCategories();
  public cities: Observable<ExcategoryModel[]>;
  public serverURL = environment.serverURL + '/category/img?link=';

  constructor(public service: ExcategoryService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.list = this.service.getTopCategories();
  }

  getCities(nextLevel: String) {
    this.cities = this.service.getCategoriesByNextLevel(nextLevel);
  }

  updateRole() {
    this.dialog.open(UpdateRoleComponent, {
      width: '600px'
    });
  }

  addCategory() {
    this.dialog.open(AddCategoryComponent, {
      width: '700px'
    });
  }

  addCriteria() {
    {
      this.dialog.open(AddFeedbackCriteriaComponent, {
        width: '700px'
      });
    }
  }

}
