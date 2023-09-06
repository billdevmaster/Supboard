const menuItems = {
    items: [
        {
            id: 'navigation',
            title: '',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home'
                },
                {
                    id: 'location',
                    title: 'Location',
                    type: 'item',
                    url: '/location',
                    icon: 'feather icon-map-pin'
                },
                {
                    id: 'locker',
                    title: 'Locker',
                    type: 'item',
                    url: '/locker',
                    icon: 'feather icon-lock'
                },
                {
                    id: 'booking',
                    title: 'Booking',
                    type: 'item',
                    url: '/booking',
                    icon: 'feather icon-calendar'
                },
                {
                    id: 'requests',
                    title: 'Requests',
                    type: 'item',
                    url: '/requests',
                    icon: 'feather icon-users'
                },
                {
                    id: 'instructions',
                    title: 'Instructions',
                    type: 'item',
                    url: '/instructions',
                    icon: 'feather icon-video'
                },
                {
                    id: 'liability-waiver',
                    title: 'Liability Waiver',
                    type: 'item',
                    url: '/liability-waiver',
                    icon: 'feather icon-paperclip'
                },
                {
                    id: 'event',
                    title: 'Event',
                    type: 'item',
                    url: '/event',
                    icon: 'feather icon-bookmark'
                },
                {
                    id: 'settings',
                    title: 'Settings',
                    type: 'collapse',
                    icon: 'feather icon-settings',
                    children: [
                        {
                            id: 'price',
                            title: 'Price List',
                            type: 'item',
                            url: '/settings/price',
                            icon: 'feather icon-life-buoy'
                        },
                        {
                            id: 'station',
                            title: 'Station List',
                            type: 'item',
                            url: '/settings/station',
                            icon: 'feather icon-map'
                        },
                        {
                            id: 'terrain',
                            title: 'Terrain',
                            type: 'item',
                            url: '/settings/terrain',
                            icon: 'feather icon-navigation'
                        },
                        {
                            id: 'review',
                            title: 'Review List',
                            type: 'item',
                            url: '/settings/review',
                            icon: 'feather icon-list'
                        },
                    ]
                },
                {
                    id: 'customer',
                    title: 'Customer',
                    type: 'item',
                    url: '/customer',
                    icon: 'feather icon-user'
                },
                {
                    id: 'equipment',
                    title: 'Equipment',
                    type: 'item',
                    url: '/equipment',
                    icon: 'feather icon-server'
                },
            ]
        }      
    ]
};

export default menuItems;
