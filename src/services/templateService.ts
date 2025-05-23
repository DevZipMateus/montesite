
// This file is now just a re-export of the functions from the separate service files
// to maintain backward compatibility with existing imports

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchTemplates,
  fetchAdminTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate
} from './templates';

export {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchTemplates,
  fetchAdminTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate
};
