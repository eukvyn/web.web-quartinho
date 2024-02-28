<template>
    <Root>
        <div class="d-flex flex-column align-items-center">
            <CommentCard v-for="commentData in comments" :key="commentData.id" :comment="commentData" />
        </div>
    </Root>
</template>
<script>
import Root from './Root.vue'
import CommentCard from './Comment.vue'

export default {
    name: 'CommentsComponent',
    components: {
        Root,
        CommentCard,
    },
    props: {
        comments: {
            type: Array[Object],
            default: [],
        }
    },
}
</script>
<style scoped></style>