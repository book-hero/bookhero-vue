<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" v-if="title !== undefined">
          <h5 class="modal-title">{{title}}</h5>
          <button type="button" class="close" aria-label="Close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">{{ cancelText }}</button>
          <button
            type="button"
            class="btn btn-primary"
            v-if="confirmText !== undefined"
            @click="$emit('confirm-action')"
          >{{confirmText}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    },
    confirmText: {
      type: String,
      required: false
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    confirmAction: {
      type: Function,
      required: false
    }
  }
}
</script>

<style scoped>
.modal-background {
  width: 100%;
  height: 100%;
  background-color: black;
}
.modal {
  display: block;
  background-color: rgba(170, 170, 170, 0.5);
}
</style>
