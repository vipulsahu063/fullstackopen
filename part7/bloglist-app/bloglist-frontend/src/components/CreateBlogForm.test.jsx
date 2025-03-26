import CreateBlogForm from './CreateBlogForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

test('the form calls the event handler it received as props with the right details when a new blog is created.', async () => {
  const createBlog = vi.fn()
  const setVisibility = vi.fn()

  render(
    <Togglable buttonLabel="Create Blog" visibility={false} setVisibility={setVisibility}>
      <CreateBlogForm createBlog={createBlog} />
    </Togglable>
  )

  const user = userEvent.setup()

  // Click the "Create Blog" button to show the form
  const createButton = screen.getByText(/Create Blog/i)
  await user.click(createButton)

  // Now the form should be visible. Access the inputs by their labels
  const titleInput = screen.getByLabelText(/title/i)
  const authorInput = screen.getByLabelText(/author/i)
  const urlInput = screen.getByLabelText(/url/i)

  // Type in values
  await user.type(titleInput, 'web dev testing')
  await user.type(authorInput, 'smoky')
  await user.type(urlInput, 'www.web2.com')

  // Click the "create" button to submit the form
  const submitButton = screen.getByRole('button', { name: /create/i })
  await user.click(submitButton)

  // Verify that the createBlog function was called with the correct arguments
  expect(createBlog).toHaveBeenCalledWith({
    title: 'web dev testing',
    author: 'smoky',
    url: 'www.web2.com',
  })

  // Optional: Ensure setVisibility was called

})
