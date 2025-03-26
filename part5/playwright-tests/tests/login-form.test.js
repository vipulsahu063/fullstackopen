const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {

    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: 'smoky',
        name: 'vipulsahu',
        password: 'pass'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('log in to application')
    await expect(locator).toBeVisible()
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('smoky')
      await page.getByTestId('password').fill('pass')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('smoky')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Invalid username or password')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('smoky')
      await page.getByTestId('password').fill('pass')
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByRole('button', { name: 'create blog' }).click()
      await page.getByTestId('title').fill('Programming after 365 days')
      await page.getByTestId('author').fill('vipulsahu')
      await page.getByTestId('url').fill('www.smoky.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('button', { name: 'create blog' }).click();
      await page.getByTestId('title').fill('Blog 2');
      await page.getByTestId('author').fill('vipulsahu');
      await page.getByTestId('url').fill('www.blog2.com');
      await page.getByRole('button', { name: 'create' }).click();

      await page.getByRole('button', { name: 'create blog' }).click();
      await page.getByTestId('title').fill('Blog 3');
      await page.getByTestId('author').fill('vipulsahu');
      await page.getByTestId('url').fill('www.blog3.com');
      await page.getByRole('button', { name: 'create' }).click();
    })

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByTestId('blog')).toHaveText('Programming after 365 days')
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByTestId('like')).toHaveText('1')
    })

    // test('user who added the blog can only see the delete button', async ({ page, request }) => {
    //   await request.post('http://localhost:3001/api/users', {
    //     data: {
    //       username: 'lucy',
    //       name: 'volkswagon',
    //       password: 'passs'
    //     }
    //   })

    //   await page.getByRole('button', { name: 'view' }).click()
    //   await expect(page.locator('[data-testid="remove"]')).toHaveText('remove');

    //   await page.getByRole('button', { name: 'logout' }).click()
    //   await page.getByTestId('username').fill('lucy')
    //   await page.getByTestId('password').fill('passs')
    //   await page.getByRole('button', { name: 'login' }).click()

    //   await page.getByRole('button', { name: 'view' }).click()
    //   await expect(page.locator('[data-testid="remove"]')).not.toHaveText('remove');
    // })

    test('a blog can only be deleted by the user who created', async ({ page }) => {
      page.on('dialog', dailog => dailog.accept())
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'remove' }).click()

    })

    // test('blogs are arranged according to the most liked blogs to less liked blogs', async ({ page }) => {
    //   await page.getByRole('button', { name: 'create blog' }).click()
    //   await page.getByTestId('title').fill('blog 1')
    //   await page.getByTestId('author').fill('vipulsahu')
    //   await page.getByTestId('url').fill('www.smoky.com')
    //   await page.getByRole('button', { name: 'create' }).click()

    //   await page.getByRole('button', { name: 'create blog' }).click()
    //   await page.getByTestId('title').fill('blog 2')
    //   await page.getByTestId('author').fill('vipulsahu')
    //   await page.getByTestId('url').fill('www.smoky.com')
    //   await page.getByRole('button', { name: 'create' }).click()

    //   await page.getByRole('button', { name: 'create blog' }).click()
    //   await page.getByTestId('title').fill('blog 3')
    //   await page.getByTestId('author').fill('vipulsahu')
    //   await page.getByTestId('url').fill('www.smoky.com')
    //   await page.getByRole('button', { name: 'create' }).click()

    //   await page.getByRole('button', { name: 'view' }).nth(0).click()
    //   await page.getByRole('button', { name: 'like' }).nth(0).click()
    //   await page.getByRole('button', { name: 'view' }).nth(1).click()
    //   await page.getByRole('button', { name: 'like' }).nth(1).click()
    //   await page.getByRole('button', { name: 'view' }).nth(2).click()
    //   await page.getByRole('button', { name: 'like' }).nth(2).click()
    //   await page.getByRole('button', { name: 'like' }).nth(2).click()
    // })

    test('blogs are arranged according to the most liked blogs to less liked blogs', async ({ page }) => {






      // Liking the blogs
      await page.getByRole('button', { name: 'view' }).nth(0).click() // Click the first blog
      await page.getByRole('button', { name: 'like' }).nth(0).click()// Like the first blog
      await page.getByRole('button', { name: 'view' }).nth(1).waitFor({ state: 'visible' })
      await page.getByRole('button', { name: 'view' }).nth(1).click() // Click the second blog
      await page.getByRole('button', { name: 'like' }).nth(1).click()// Like the second blog
      await page.getByRole('button', { name: 'view' }).nth(2).waitFor({ state: 'visible' })
      await page.getByRole('button', { name: 'view' }).nth(2).click() // Click the third blog
      await page.getByRole('button', { name: 'like' }).nth(2).click() // Like the third blog
      await page.getByRole('button', { name: 'like' }).nth(2).click() // Like the third blog again

      // Verify blogs are sorted by likes
      const blogLikes = await page.locator('[data-testid="like"]')
      const likesCount = [] 

      for (let i = 0; i < await blogLikes.count(); i++) {
        const likeText = await blogLikes.nth(i).innerText()
        likesCount.push(parseInt(likeText, 10)) // Convert string to number
      }

      // Check if the blogs are sorted in descending order based on likes
      const sortedLikes = [...likesCount].sort((a, b) => b - a) // Sort in descending order
      expect(likesCount).toEqual(sortedLikes) // Ensure the actual likes are in the sorted order

    })


  })
})


