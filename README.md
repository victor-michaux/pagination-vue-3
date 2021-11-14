[![Maintainability](https://api.codeclimate.com/v1/badges/eb5b5d6a1c5ee7253547/maintainability)](https://codeclimate.com/github/victor-michaux/pagination-vue-3/maintainability)

Headless Pagination for Vue 3

## Installation
```shell
# npm
npm install @victor-michaux/pagination-vue-3

# Yarn
yarn add @victor-michaux/pagination-vue-3
```

## Component API

### Pagination
 The main Pagination component.

 | Prop | Type | Description
 | - | - | - |
 | activePage | number | The pagination active page. |
 | totalPages | number | The total number of pages. |
 | padding | number | The number of pages displayed arround the active page. |

| Event | Return Type | Description |
| - | - | - |
| update:activePage | number | The event is triggered when the pagination active page change. It returns the new active page. |

### PaginationPagesList
The component that wraps the list of pages in the pagination.

| Scoped Slot Prop | Type | Description
| - | - | - |
| pages | number[] | The list of the pages in the pagination. |

 ### PaginationPagesListButton
 The component that is used to wrap each page within the PagesList component.

| Prop | Type | Description
| - | - | - |
| page | number | The page value. |

| Scoped Slot Prop | Type | Description
| - | - | - |
| isActive | boolean | Whether or not the page is the pagination active page. |
| selectCurrentPageEvents | object | Declare a click event to set the page prop value as the pagination active page. |

### PaginationButtonFirstPage
The component that is used to wrap the first page button.

| Scoped Slot Prop | Type | Description
| - | - | - |
| disabled | boolean | Whether or not the pagination active page can't be set to the first page. |
| selectFirstPageEvents | object | Declare a click event to set the pagination active page to the first page. |

### PaginationButtonPreviousPage
The component that is used to wrap the previous page button

| Scoped Slot Prop | Type | Description
| - | - | - |
| disabled | boolean | Whether or not the pagination active page can't be set to the previous page. |
| selectPreviousPageEvents | object | Declare a click event to set the pagination active page to the previous one. |

### PaginationButtonNextPage
The component that is used to wrap the next page button

| Scoped Slot Prop | Type | Description
| - | - | - |
| disabled | boolean | Whether or not the pagination active page can't be set to the previous page. |
| selectNextPageEvents | object | Declare a click event to set the pagination active page to the next one. |

### PaginationButtonLastPage
The component that is used to wrap the last page button

| Scoped Slot Prop | Type | Description
| - | - | - |
| disabled | boolean | Whether or not the pagination active page can't be set to the last page. |
| selectLastPageEvents | object | Declare a click event to set the pagination active page to the last page. |

