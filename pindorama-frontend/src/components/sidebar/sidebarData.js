import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [
  {
    title: 'Usuários',
    path: '/usuarios',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpen: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Cadastrar Usuário',
        path: '/usuarios/cadastrar',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Buscar usuário por ID',
        path: `/usuarios/buscar/id`,
        icon: <IoIcons.IoIosPaper />,
      },
    ]
  },
  {
    title: 'Passagens',
    path: '/passagens',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpen: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Cadastrar Passagem',
        path: '/passagens/cadastrar',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Buscar passagem por ID',
        path: `/passagens/buscar/id`,
        icon: <IoIcons.IoIosPaper />,
      },
    ]
  },
  {
    title: 'Pacotes',
    path: '/pacotes',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpen: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Cadastrar Pacote',
        path: '/pacotes/cadastrar',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Buscar Pacote por ID',
        path: `/pacotes/buscar/id`,
        icon: <IoIcons.IoIosPaper />,
      },
    ]
  },
  {
    title: 'Viagens',
    path: '/Viagens',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpen: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Cadastrar Viagem',
        path: '/Viagens',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Buscar Viagem por ID',
        path: `'/api/Viagens/'`,
        icon: <IoIcons.IoIosPaper />,
      },
    ]
  },


]

