import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  // dùng inject để truy cập vào TasksService
  private tasksService = inject(TasksService);
  // dùng signal để tạo biến phản ứng có giá trị ban đầu là all
  selectedFilter = signal<string>('all');

  // Khi thay đổi bộ lọc thông qua onChangeTasksFilter, giá trị của selectedFilter thay đổi.
  // computed tự động tính toán lại danh sách tasks dựa trên giá trị mới của selectedFilter.
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'all':
        return this.tasksService.allTasks();
      case 'open':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    // Sử dụng phương thức set của selectedFilter để cập nhật giá trị bộ lọc mới.
    this.selectedFilter.set(filter);
  }
}
