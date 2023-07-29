import * as moment from 'moment-timezone';
import { BaseCommandHandler } from '../../../../common/commands';
import { UpdateEmployeeBirthdate } from '../update-employee-birthdate.command';
import { CommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/employees.repository';

@CommandHandler(UpdateEmployeeBirthdate)
@Injectable()
export class EmployeeBirthDateUpdater extends BaseCommandHandler<UpdateEmployeeBirthdate, void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    super();
  }
  async handle(command: UpdateEmployeeBirthdate): Promise<void> {
    const {
      employeeId,
      birthdate
    } = command;

    const employee = await this.employeeRepository.findById(employeeId);

    employee.birthdate = new Date(birthdate);

    await this.employeeRepository.save(employee);
  }
}
