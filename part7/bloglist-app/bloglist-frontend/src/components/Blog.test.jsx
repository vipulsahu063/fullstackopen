import Blog from './Blog'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'


describe('<blog />', () => {

  const blog = {
    title: 'Intro to integration testing',
    author: 'smoky',
    url: 'www.smoky.com',
    likes: 23,
    user: {
      username: 'smokyUser'
    }
  }

  test('renders blog\'s title and author', () => {

    const { container } = render(<Blog blog={blog} increaseLike={() => { }} />)
    const div = container.querySelector('.blog-head')
    expect(div).toHaveTextContent('Intro to integration testing')
    expect(div).toHaveTextContent('smoky')
    expect(div).not.toHaveTextContent('www.smoky.com')
    expect(div).not.toHaveTextContent(23)

  })

  test('renders url and likes when show button is clicked', async () => {

    const { container } = render(<Blog blog={blog} increaseLike={() => { }} />)
    const div = container.querySelector('.blog-bottom')

    const user = userEvent.setup()

    const button = await screen.findByRole('button', { name: /view/i })
    await user.click(button)

    expect(div).toHaveTextContent('www.smoky.com')
    expect(div).toHaveTextContent(23)
  })

  test('like button is clicked twice, the event handler the component received as props is called twice.', async () => {
    const increaseLike = vi.fn()

    render(<Blog blog={blog} increaseLike={increaseLike} />)

    const user = userEvent.setup()

    const viewButton = await screen.findByRole('button', { name: /view/i })
    await user.click(viewButton)

    const likeButton = await screen.findByRole('button', { name: /like/i })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(increaseLike.mock.calls).toHaveLength(2)

  })
})

