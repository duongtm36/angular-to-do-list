import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  // Sử dụng signal để tạo biến phản ứng cho danh sách tasks
  // signal cho phép theo dõi và phản ứng với các tháy đổi trong tasks
  private tasks = signal<Task[]>([]);

  private logginService = inject(LoggingService);

  // tạo một biến chỉ đọc để lấy tất cả các tasks
  // biến chỉ đọc, chỉ cho phép truy cập danh sách mà không được thay đổi
  allTasks = this.tasks.asReadonly();

  // thêm một task mới, nhận vào một object chứa title và description từ form
  addTask(taskData: { title: string; description: string }) {
    // tạo một task mới với id ngẫu nhiên và status mặc định là 'OPEN'
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    // Cập nhật danh sách các task bằng cách thêm task mới vào mảng hiện tại
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.logginService.log('Task ' + taskData.title + ' added');
  }

  // cập nhật trạng thái cho task
  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    // Duyệt qua danh sách các task và nếu tìm thấy task có id khớp với taskId,
    // thì tạo một bản sao của task đó với trạng thái mới (newStatus).
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    this.logginService.log('Task status changed to ' + newStatus);
  }
}
