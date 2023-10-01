import * as React from 'react';
import Card from '@mui/joy/Card';
import Link from '@mui/joy/Link'
import CardOverflow from '@mui/joy/CardOverflow';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Chip from '@mui/joy/Chip';
// import { Chip, Card, Link, CardContent, Typography, CardOverflow} from '@mui/joy';

export default function CardInterface(){
    return (
        <Card size="lg">
            {/* we can add <img> and <AspectRatio>
            */}
            <CardContent>
                <Typography level="title-lg">
                    This is the base card.
                </Typography>
                <Typography level="body-sm">
                    <Link href="#interactive-card">
                    </Link>
                    This is the body of the card.
                </Typography>
                <Chip size="sm">
                    This is a tiny chip.
                </Chip>
            </CardContent>
        </Card>
    );
}