import React from 'react'
import { Skeleton, Space } from 'antd'

export default function MessageSkeleton() {

    const RightMessageSkeleton = ({width="15rem", height="2rem"}) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                    maxWidth: '60%',
                    display: 'flex',
                    gap: "1rem",
                    alignItems: 'center'
                }}>
                    <Skeleton.Input
                        active
                        size="small"
                        style={{
                            width: width,
                            borderRadius: '1rem',
                            height: height,
                        }}
                    />
                    <Skeleton.Avatar size={40} />
                </div>
            </div>
        )
    }

    const LeftMessageSkeleton = ({width="15rem" , height="2rem"}) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                    maxWidth: '60%',
                    display: 'flex',
                    gap: "1rem",
                    alignItems: 'center'
                }}>
                    <Skeleton.Avatar size={40} />
                    <Skeleton.Input
                        active
                        size="small"
                        style={{
                            width: width,
                            borderRadius: '1rem',
                            height: height,
                        }}
                    />
                </div>
            </div>
        )
    }
    return (
        <div style={{ padding: '1rem', height: '100%', overflowY: 'hidden' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>

                <RightMessageSkeleton width="25rem" height="5rem" />
                <LeftMessageSkeleton width="25rem" height="3rem" />

                <RightMessageSkeleton width="10rem" height="2rem" />
                <LeftMessageSkeleton width="25rem" height="6rem" />
                
                <RightMessageSkeleton width="25rem" height="4rem" />
                <LeftMessageSkeleton width="25rem" height="3rem" />

                <RightMessageSkeleton width="25rem" height="5rem" />
                <LeftMessageSkeleton width="25rem" height="3rem" />

                <RightMessageSkeleton width="10rem" height="2rem" />
                <LeftMessageSkeleton width="25rem" height="6rem" />
                
                <RightMessageSkeleton width="25rem" height="4rem" />
                <LeftMessageSkeleton width="25rem" height="3rem" />
                
                

            </Space>
        </div>
    )
}
