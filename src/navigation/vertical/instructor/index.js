const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: 'tabler:device-analytics',
      path: '/dashboard'
    },
    {
      sectionTitle: 'Features'
    },
    {
      title: 'Challenges',
      icon: 'tabler:trophy',
      children: [
        {
          title: 'Consult Challenges',
          path: '/challenges/consult'
        },
        {
          title: 'My Drafts',
          path: '/challenges/mine'
        },
        {
          title: 'Analytics',
          path: '/challenges/analytics'
        }
      ]
    },
    {
      title: 'Gamified Courses',
      icon: 'tabler:device-gamepad-2',
      children: [
        {
          title: 'Consult Gamified Courses',
          path: '/gamifiedcourses/consult'
        },
        {
          title: 'My Gamified Courses',
          path: '/gamifiedcourses/mine'
        }
      ]
    },
    {
      title: 'Learning Paths',
      icon: 'tabler:route',
      children: [
        {
          title: 'Consult Learning Paths',
          path: '/learningpaths/consult'
        }
      ]
    }
  ]
}

export default navigation
