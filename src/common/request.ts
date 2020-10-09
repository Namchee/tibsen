import { ParameterError } from '../exception/parameter';

export interface RequestBody {
  email: string;
  password: string;
  schedule: number[][];
}

export function isRequestBody(body: any): asserts body is RequestBody {
  const pattern = /(\d+)@student\.unpar\.ac\.id/;

  if (Object.keys(body).length !== 3) {
    throw new ParameterError('Invalid keys');
  }

  if (!body.email) {
    throw new ParameterError('Email must be provided');
  }

  if (!pattern.test(body.email)) {
    throw new ParameterError('Invalid email');
  }

  if (!body.password) {
    throw new ParameterError('Password must be provided');
  }

  if (!body.schedule) {
    throw new ParameterError('Schedule must be provided');
  }

  if (!Array.isArray(body.schedule)) {
    throw new ParameterError(
      'Schedule must be an 2 dimensional array of numbers',
    );
  }

  if (body.schedule.length !== 5) {
    throw new ParameterError('Invalid schedule format');
  }
}
