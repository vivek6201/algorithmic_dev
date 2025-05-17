// import { educationValidation } from '@/validations/profile/education';
// import { experienceValidation } from '@/validations/profile/experience';
// import { projectValidation } from '@/validations/profile/projects';
// import { z } from 'zod';

// export enum ProfileFormType {
//   PERSONAL_FORM = 'PERSONAL_FORM',
//   EDUCATION_FORM = 'EDUCATION_FORM',
//   EXPERIENCE_FORM = 'EXPERIENCE_FORM',
//   PROJECTS_FORM = 'PROJECTS_FORM',
// }

// const formSchemas = {
//   [ProfileFormType.PROJECTS_FORM]: projectValidation,
//   [ProfileFormType.EXPERIENCE_FORM]: experienceValidation,
//   [ProfileFormType.EDUCATION_FORM]: educationValidation,
// };

// type FormSchemaMap = typeof formSchemas;

// export type ProfileFormDataType<T extends keyof FormSchemaMap> = z.infer<FormSchemaMap[T]>;
