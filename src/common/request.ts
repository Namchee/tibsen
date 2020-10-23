import { ParameterError } from '../exception/parameter';

export interface RequestBody {
  email: string;
  password: string;
  schedule: number[][];
}

export function isRequestBody(body: any): asserts body is RequestBody {
  if (!body) {
    throw new ParameterError('Body is required');
  }
  
  const pattern = /(\D+)@student\.unpar\.ac\.id/;

  if (!body.email) {
    throw new ParameterError('Email must be provided');
  }

  const email = body.email as string;

  if (email.match(pattern) !== null) {
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
