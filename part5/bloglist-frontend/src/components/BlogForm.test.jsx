import CreateBlogForm from './CreateBlogForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


test('calls the event handler with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()

  render(<CreateBlogForm createBlog={createBlog} />)

  const user = userEvent.setup()

  const titleInput = screen.getByLabelText(/title/i)
  const authorInput = screen.getByLabelText(/author/i)
  const urlInput = screen.getByLabelText(/url/i)
  const submitButton = screen.getByRole('button', { name: /create/i })

  // Fill in the form
  await user.type(titleInput, 'New Blog Title')
  await user.type(authorInput, 'Blog Author')
  await user.type(urlInput, 'http://newblog.com')

  // Submit the form
  await user.click(submitButton)

  // Assert the event handler was called with the correct arguments
  expect(createBlog).toHaveBeenCalledWith({
    title: 'New Blog Title',
    author: 'Blog Author',
    url: 'http://newblog.com'
  })
})